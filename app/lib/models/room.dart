class Room {
  final String id;

  Room({required this.id});

  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(id: json['id']);
  }

  static List<Room> fromJsonList(List<dynamic> jsonArray) {
    final List<Room> roomList = <Room>[];
    for (final json in jsonArray) {
      roomList.add(Room.fromJson(json));
    }
    return roomList;
  }
}
