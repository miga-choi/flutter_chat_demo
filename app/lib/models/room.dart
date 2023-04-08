class Room {
  final String id;
  final String name;

  Room({
    required this.id,
    required this.name,
  });

  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(id: json['id'], name: json['name']);
  }

  static List<Room> fromJsonList(List<dynamic> jsonArray) {
    final List<Room> roomList = <Room>[];
    for (final dynamic json in jsonArray) {
      roomList.add(Room.fromJson(json));
    }
    return roomList;
  }
}
