export const Query = {
  patients: (_, __, { db }) => db.patients,
};

