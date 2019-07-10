class pubSubModule {
    constructor() {
        this.key = 0;
        this.topics = {};
    }

    subscribe(topic, subscriber) {
        if (!this.topics[topic])  this.topics[topic]  = [];

        const index = this.topics[topic].push(subscriber) - 1;
        return () => {
            delete this.topics[topic][index];
        }
    }

    publish(topic, info){
        this.topics[topic] && this.topics[topic].forEach((fn) => {
            fn(info !== undefined ? info : {});
        });
    }
}

const pubSub =  new pubSubModule();


window.addEventListener("mouseup", (e) => {
    pubSub.publish("mouseup", e);
});

window.addEventListener("mousemove", (e) => {
    pubSub.publish("mousemove", e);
});

export default pubSub;