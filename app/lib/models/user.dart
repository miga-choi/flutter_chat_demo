import 'dart:convert';

class User {
  final String id;
  final String username;

  User({
    required this.id,
    required this.username,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
    );
  }

  static List<User> fromJsonList(List<dynamic> jsonList) {
    List<User> userList = <User>[];
    for (final dynamic json in jsonList) {
      userList.add(User.fromJson(json));
    }
    return userList;
  }
}
