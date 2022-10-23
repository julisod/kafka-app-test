const Kafka = require("node-rdkafka");

console.log("*** Producer starts... ***");

const stream = Kafka.Producer.createWriteStream({
    "metadata.broker.list" : "localhost:9092"
}, {}, {topic: "task"});

const randomizeIntegerBetween = (from, to) => {
    return (Math.floor(Math.random() * (to-from + 1))) + from;
}

const queueMessage = () => {
    // We'll generate two random numbers and send them to the
    // consumer asking what the result is
    const n1 = randomizeIntegerBetween(1, 10);
    const n2 = randomizeIntegerBetween(1, 20);
    const obj = {n1, n2}

    const success = stream.write(Buffer.from(
        JSON.stringify(obj)
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