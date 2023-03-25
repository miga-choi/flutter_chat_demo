class Constant {
  static const String baseUrl = 'http://172.30.1.100:8080';
  static final RegExp usernameReg = RegExp(r'^[a-zA-Z\d]+$');
  static final Map<String, String> httpHeader = {'Content-Type': 'application/json'};
}
