docker run -it --rm --network app-tier -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 bitnami/kafka:latest kafka-console-producer.sh --bootstrap-server 172.18.0.3:9092 --topic berita
