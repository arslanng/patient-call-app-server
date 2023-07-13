import { pipe, filter } from "graphql-yoga";

export const Subscription = {
  allPatients: {
    subscribe: (_, __, { pubSub, db }) => {
      setTimeout(() => {
        pubSub.publish("allPatients", { allPatients: db.patients });
      });
      return pubSub.subscribe("allPatients");
    },
  },
  patientCreated: {
    subscribe: (_, args, { pubSub }) => {
      return pipe(
        pubSub.subscribe("patientCreated"),
        filter((value) =>
          args.company ? value.patientCreated.company === args.company : true
        )
      );
    },
  },
  patientDeleted: {
    subscribe: (_, args, { pubSub }) => {
      return pipe(
        pubSub.subscribe("patientDeleted"),
        filter((value) =>
          args.company ? value.patientDeleted.company === args.company : true
        )
      );
    },
  },
  patientUpdated: {
    subscribe: (_, args, { pubSub }) => {
      return pipe(
        pubSub.subscribe("patientUpdated"),
        filter((value) =>
          args.company ? value.patientUpdated.company === args.company : true
        )
      );
    },
  },
};
