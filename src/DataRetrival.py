import json
import pytz
from datetime import datetime
import pika
import logging
import sys
import time

logging.basicConfig()

credentials = pika.PlainCredentials(username='guest', password='guest')
connection = pika.BlockingConnection(pika.ConnectionParameters(host = 'rabbitmq-service' , port=5672, credentials=credentials))
channel = connection.channel()
channel.queue_declare(queue='searchParam')

def callback(ch, method, properties, body):
    data = json.loads(body)
    radar_id = data['radar_id']
    
    start_date = data['start_date']
    print("Start date: ", start_date)
    start = start_date.split("T")
    temp1 = start[0].replace('-',',')
    temp2 = start[1][:-5].replace(":",",")
    start_date = str(temp1 +  "," + temp2)
    
    end_date = data['end_date']
    end = end_date.split("T")
    temp1 = end[0].replace('-',',')
    temp2 = end[1][:-5].replace(":",",")
    end_date = str(temp1 +  "," + temp2)
    print("data retrival sdate: ", start_date)
    
    user_id = data['user_id']
    function_type = data['function_type']
    timestamp = datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    
    payload = {"user_id":user_id, "function_type":function_type, "radar_id":radar_id, "start_date":start_date, "end_date":end_date,"timestamp":str(timestamp)}
    microservice_connection = pika.BlockingConnection(pika.ConnectionParameters(host = 'rabbitmq-service' , port=5672, credentials=credentials))
    microservice_channel = microservice_connection.channel()
    microservice_channel.exchange_declare(exchange='topic_logs', exchange_type='topic')
    routing_key = payload['function_type']
    microservice_channel.basic_publish(exchange='topic_logs',routing_key=routing_key,body=json.dumps(payload))
    
    microservice_connection.close()


channel.basic_consume(queue='searchParam',auto_ack=True,on_message_callback=callback)

print('[*] Waiting for radar files. To exit press CTRL+C')

channel.start_consuming()
