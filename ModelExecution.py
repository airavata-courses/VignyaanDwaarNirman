import pika
import requests, json 
import matplotlib.pyplot as plt
import tempfile
import pytz
from datetime import datetime
import nexradaws
import pyart

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.exchange_declare(exchange="topic_logs", exchange_type = "topic")
result = channel.queue_declare(queue='', exclusive= True)
queue_name = result.method.queue
binding_key = "ref"
channel.queue_bind(exchange="topic_logs", queue = queue_name, routing_key = binding_key)

print('[*] Waiting for radar files. To exit press CTRL+C')

def callback(ch, method, properties, body):
    conn = nexradaws.NexradAwsInterface()
    templocation = tempfile.mkdtemp()
    central_timezone = pytz.timezone('US/Central')
    data = json.loads(body)
    radar_id, start, end = data['radar_id'], data['start'], data['end']
    start = 2019,5,31,17,0
    end = 2019,5,31,18,0
    print(type(start) , start)
    start = central_timezone.localize(datetime(2019,5,31,17,0))
    end = central_timezone.localize (datetime(2019,5,31,18,0))
    scans = conn.get_avail_scans_in_range(start, end, radar_id)
    results = conn.download(scans[0:4], templocation)
    fig = plt.figure(figsize=(16,12))
    for i,scan in enumerate(results.iter_success(),start=1):
        ax = fig.add_subplot(2,2,i)
        radar = scan.open_pyart()
        display = pyart.graph.RadarDisplay(radar)
        display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
        display.set_limits((-150, 150), (-150, 150), ax=ax)
    fig.savefig("reflectivity"+".png")
    
channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)


channel.start_consuming()