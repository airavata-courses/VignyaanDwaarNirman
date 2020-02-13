import json
import pytz
from datetime import datetime
import pika
import logging
import sys
import time

logging.basicConfig()

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='searchParam')

def callback(ch, method, properties, body):
    data = json.loads(body)
    radar_id = data['radar_id']
    start_date = data['start_date']
    print("Start date: ", start_date)
    #start_date = str(datetime.strptime(start_date[4:24], '%b %d %Y %I:%M:%S'))      
    #start = start_date.split(" ")
    #temp1 = start[0].replace('-',',')
    #temp2 = start[1].replace(":",",")
    #start_date = str(temp1 +  "," + temp2)
    #end_date = data['end_date']
    #end_date = str(datetime.strptime(end_date[4:24], '%b %d %Y %I:%M:%S'))
    #end = end_date.split(" ")
    #temp1 = end[0].replace('-',',')
    #temp2 = end[1].replace(":",",")
    #end_date = str(temp1 +  "," + temp2)
    print("data retrival sdate: ", start_date)
    user_id = data['user_id']
    function_type = data['function_type']
    timestamp = datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    
    #payload = {'function_type':function_type, 'radar_id':radar_id,'start':start_date,'end':end_date}
    payload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":str("2019,5,31,17,0"), "end_date":str("2019,5,31,18,0"),"timestamp":str(timestamp)}
    microservice_connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    microservice_channel = microservice_connection.channel()
    microservice_channel.exchange_declare(exchange='topic_logs', exchange_type='topic')
    routing_key = payload['function_type']
    microservice_channel.basic_publish(exchange='topic_logs',routing_key=routing_key,body=json.dumps(payload))
    
    # session_connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
	# session_channel = session_connection.channel()
	# session_channel.queue_declare(queue='sessionData')
	# sessionPayload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":start_date, "end_date":end_date,"timestamp":timestamp}
	# session_channel.basic_publish(exchange='', routing_key='sessionData', body=json.dumps(sessionPayload))

    microservice_connection.close()
    # session_channel.close()


channel.basic_consume(queue='searchParam',auto_ack=True,on_message_callback=callback)

print('[*] Waiting for radar files. To exit press CTRL+C')

channel.start_consuming()


# central_timezone = pytz.timezone('US/Central')

# payload = {'function_type':sys.argv[1], 'radar_id':sys.argv[2],'start':sys.argv[3],'end':sys.argv[4]}

# connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
# channel = connection.channel()
# channel.exchange_declare(exchange='topic_logs', exchange_type='topic')

# routing_key = payload['function_type']

# channel.basic_publish(exchange='topic_logs',routing_key=routing_key,body=json.dumps(payload))

# print(routing_key, json.dumps(payload))

# connection.close()