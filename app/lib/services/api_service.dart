import 'dart:convert';
import 'package:app/constant.dart';
import 'package:app/models/response_model.dart';
import 'package:app/models/room.dart';
import 'package:http/http.dart' as http;

class ApiService {
  Future<List<Room>> getRooms(String username) async {
    final String body = jsonEncode({
      'username': username,
    });
    final http.Response response = await http.get(
      Uri.parse('${Constant.baseUrl}/rooms/user/$username'),
      headers: Constant.httpHeader,
    );
    final ResponseModel responseModel = ResponseModel.fromJson(jsonDecode(response.body));
    List<Room> rooms = <Room>[];
    if (responseModel.success) {
      rooms = Room.fromJsonList(responseModel.data);
    }
    return rooms;
  }
}
