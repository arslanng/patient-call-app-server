export const Subscription = {
  allPatients: {
    subscribe: (_, __, { pubSub, db }) => {
      setTimeout(() => {
        pubSub.publish("allPatients", { allPatients: db.patients });
      });
      return pubSub.subscribe("allPatients");
    },
  },
};

