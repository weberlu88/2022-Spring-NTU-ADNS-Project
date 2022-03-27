/** @param {import("axios").AxiosInstance} instance */
export const makeUser = (instance) => ({
    getAll() {
      return instance.get("/users");
    },
  });
  