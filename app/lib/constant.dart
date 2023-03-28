class Constant {
  static const String baseUrl = 'http://localhost:8080';
  static final RegExp usernameReg = RegExp(r'^[a-zA-Z\d]+$');
  static final Map<String, String> httpHeader = {'Content-Type': 'application/json'};
}
