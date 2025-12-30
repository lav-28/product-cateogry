class ServiceResponse {
  constructor(success = false, data = null, message = "") {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

module.exports = ServiceResponse;
