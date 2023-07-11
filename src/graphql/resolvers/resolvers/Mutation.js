import { nanoid } from "nanoid";

export const Mutation = {
  createPatient: (_, args, { pubSub, db }) => {
    const patient = {
      id: nanoid(),
      registration_number: args.data.registration_number,
      status: args.data.status,
      company: args.data.company,
    };
    db.patients.push(patient);

    pubSub.publish("allPatients", { allPatients: db.patients });
    return patient;
  },

  updatePatient: (_, { id, data }, { pubSub, db }) => {
    const patient_index = db.patients.findIndex((patient) => patient.id === id);
    if (patient_index === -1) {
      throw new Error("Patient not found.");
    }

    const update_patient = (db.patients[patient_index] = {
      ...db.patients[patient_index],
      ...data,
    });

    pubSub.publish("allPatients", { allPatients: db.patients });
    return update_patient;
  },

  deletePatient: (_, { id }, { pubSub, db }) => {
    const patient_index = db.patients.findIndex((patient) => patient.id === id);
    if (patient_index === -1) {
      throw new Error("Patient not found.");
    }
    const deleted_patient = db.patients[patient_index];

    db.patients.splice(patient_index, 1);

    pubSub.publish("allPatients", { allPatients: db.patients });
    return deleted_patient;
  },

  deleteAllPatients: (_, __, { pubSub, db }) => {
    const length = db.patients.length;

    db.patients.splice(0, length);

    pubSub.publish("allPatients", { allPatients: db.patients });
    return { count: length };
  },
};

