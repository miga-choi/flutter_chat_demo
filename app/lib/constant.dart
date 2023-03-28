class Constant {
  static const String baseUrl = 'http://192.168.48.234:8080/api';
  static final RegExp usernameReg = RegExp(r'^[a-zA-Z\d]+$');
  static final Map<String, String> httpHeader = {'Content-Type': 'application/json'};
}
