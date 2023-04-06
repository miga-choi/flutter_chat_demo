import 'package:app/constant.dart';
import 'package:app/models/response_model.dart';
import 'package:app/models/room.dart';
import 'package:app/screens/sign_in_screen.dart';
import 'package:app/services/api_service.dart';
import 'package:app/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class RoomScreen extends StatefulWidget {
  const RoomScreen({
    Key? key,
    required this.username,
  }) : super(key: key);

  final String username;

  @override
  State<RoomScreen> createState() => _RoomScreenState();
}

class _RoomScreenState extends State<RoomScreen> {
  final AuthService _authService = AuthService();
  final ApiService _apiService = ApiService();
  final Map<String, IO.Socket> socketMap = {};

  List<Room> rooms = <Room>[];

  Future<ResponseModel> onSignOutPress() async {
    return _authService.signOut();
  }

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    final List<Room> getRooms = await _apiService.getRooms(widget.username);
    setState(() {
      rooms = getRooms;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Room list'),
        actions: [
          IconButton(
            onPressed: () async {
              final ResponseModel result = await onSignOutPress();
              if (result.success && context.mounted) {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const SignInScreen(),
                  ),
                );
              }
            },
            icon: const Icon(Icons.logout),
          )
        ],
      ),
      body: SafeArea(
        child: SizedBox(
          height: 300,
          child: SingleChildScrollView(
            physics: const ScrollPhysics(),
            scrollDirection: Axis.vertical,
            child: Column(
              children: <Widget>[
                ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: rooms.length,
                  itemBuilder: (BuildContext context_, int index_) {
                    final String id = rooms[index_].id;
                    IO.Socket socket = IO.io(
                      '${Constant.baseUrl}/rooms/$id',
                      IO.OptionBuilder().setTransports(['websocket']).build(),
                    );
                    socket.on('refresh', (dynamic data_) {
                      print('refresh[$index_] => $data_');
                    });
                    socketMap[id] = socket;
                    return GestureDetector(
                      onTap: () {
                        print(rooms[index_].id);
                      },
                      child: ListTile(
                        title: Text(rooms[index_].name),
                        shape: const RoundedRectangleBorder(
                          side: BorderSide(color: Colors.black, width: 1),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print('createChat');
          showDialog(
            context: context,
            builder: (context) => const AddChatDialog(),
          );
        },
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
        ),
        backgroundColor: Colors.blue.shade400,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}

class AddChatDialog extends StatefulWidget {
  const AddChatDialog({Key? key}) : super(key: key);

  @override
  State<AddChatDialog> createState() => _AddChatDialogState();
}

class _AddChatDialogState extends State<AddChatDialog> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Center(
        child: Text('Hello, World!'),
      ),
    );
  }
}
