import pika
import requests, json 
import matplotlib.pyplot as plt
import tempfile
import pytz
from datetime import datetime
import nexradaws
import pyart
import os
import base64


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.exchange_declare(exchange="topic_logs", exchange_type = "topic")
result = channel.queue_declare(queue='', exclusive= True)
queue_name = result.method.queue
binding_key = "vel"
channel.queue_bind(exchange="topic_logs", queue = queue_name, routing_key = binding_key)

print('[*] Waiting for radar files. To exit press CTRL+C')

def callback(ch, method, properties, body):
    conn = nexradaws.NexradAwsInterface()
    templocation = tempfile.mkdtemp()
    central_timezone = pytz.timezone('US/Central')
    data = json.loads(body)
    radar_id, start_date, end_date = data['radar_id'], data['start_date'], data['end_date']
    user_id = data['user_id']
    function_type = data['function_type']
    timestamp = data['timestamp']
    start = [int(x) for x in start_date.split(',')]
    styear, stmonth, stday, sthour, stminute = start[0], start[1], start[2], start[3], start[4]
    end = [int(x) for x in end_date.split(',')]
    edyear, edmonth, edday, edhour, edminute = end[0], end[1], end[2], end[3], end[4]
    #print(type(start) , start)
    start_date = central_timezone.localize(datetime(styear, stmonth, stday, sthour, stminute))
    end_date = central_timezone.localize (datetime(edyear, edmonth, edday, edhour, edminute))
    scans = conn.get_avail_scans_in_range(start_date, end_date, radar_id)
    results = conn.download(scans[0:4], templocation)
    try:
        fig = plt.figure(figsize=(16,12))
        for i,scan in enumerate(results.iter_success(),start=1):
            if "MDM" in str(scan.filename):
                print("Found Unsupported File")
            else:
                ax = fig.add_subplot(2,2,i)
                radar = scan.open_pyart()
                display = pyart.graph.RadarDisplay(radar)
                display.plot('velocity',1,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
                display.set_limits((-150, 150), (-150, 150), ax=ax)    
        temp = str(start_date.date()).replace('-','')
        fig.savefig(os.getcwd() + "\\" + "plots" + "\\" + str(radar_id) + "_" + str(temp) + "_velocity"+".png")
        file_location = os.getcwd() + "\\" + "plots" + "\\" + str(radar_id) + "_" + str(temp) + "_velocity"+".png"
    except:
        print("Compression Error")
        file_location = ""

    with open(file_location, "rb") as img:
    	myString = base64.b64encode(img.read())
    SessionPayload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":str(start_date), "end_date":str(end_date),"timestamp":timestamp, "file_location":str(myString.decode("utf-8"))}
    ApiPayload = {"file_location":str(myString.decode("utf-8"))}
    #Payload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":str(start_date), "end_date":str(end_date),"timestamp":timestamp, "file_location":file_location}
    #SessionPayload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":str(start_date), "end_date":str(end_date),"timestamp":timestamp, "file_location":file_location}
    #ApiPayload = {"file_location":file_location}
    # modelAnaly_connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    # modelAnaly_channel = modelAnaly_connection.channel()
    # #modelExec_channel.queue_declare(queue='sessionData')
    # modelAnaly_channel.exchange_declare(exchange='logs', exchange_type='fanout')
    # sessionPayload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":str(start_date), "end_date":str(end_date),"timestamp":timestamp, "file_location":file_location}
    # modelAnaly_channel.basic_publish(exchange='logs', routing_key='', body=json.dumps(sessionPayload))

    api_connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    api_channel = api_connection.channel()
    api_channel.queue_declare(queue='apiData', durable=True)
    api_channel.basic_publish(exchange='', routing_key='apiData', body=json.dumps(ApiPayload))

    session_connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    session_channel = session_connection.channel()
    session_channel.queue_declare(queue='sessionData')
    session_channel.basic_publish(exchange='', routing_key='sessionData', body=json.dumps(SessionPayload))

    api_connection.close()
    session_connection.close()

channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)


channel.start_consuming()