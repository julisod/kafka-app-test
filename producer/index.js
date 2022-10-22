const Kafka = require("node-rdkafka");

console.log("*** Producer starts... ***");

const stream = Kafka.Producer.createWriteStream({
    "metadata.broker.list" : "localhost:9092"
}, {}, {topic: "task"});

/* const randomizeIntegerBetween = (from, to) => {
    return (Math.floor())
} */

const queueMessage = () => {
    const success = stream.write(Buffer.from(
        "Hello world"
    ));

    if(success) {
        console.log("Message sent succesfully to stream");
    } else {
        console.log("Problem writing to stream");
    }
}

setInterval(() => {
    queueMessage();
}, 5000)