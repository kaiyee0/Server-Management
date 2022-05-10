function getServiceTypeByNumber(type) {
  switch (type) {
    case 1:
      return "Main Service";
    case 2:
      return "Database";
    case 3:
      return "Kafka";
    case 4:
      return "Redis";
    case 5:
      return "Others";
  }
}

export { getServiceTypeByNumber };
