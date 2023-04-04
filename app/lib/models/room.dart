class Room {
  final String id;

  Room({required this.id});

  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(id: json['id']);
  }

  List<Room> getRoomList(List<Map<String, dynamic>> jsonArray) {
    final List<Room> roomList = <Room>[];
    for (final json in jsonArray) {
      roomList.add(Room.fromJson(json));
    }
    return roomList;
  }
}
