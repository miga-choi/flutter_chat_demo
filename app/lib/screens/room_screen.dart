import 'package:app/models/response_model.dart';
import 'package:app/models/room.dart';
import 'package:app/screens/sign_in_screen.dart';
import 'package:app/services/api_service.dart';
import 'package:app/services/auth_service.dart';
import 'package:flutter/material.dart';

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
    rooms = await _apiService.getRooms(widget.username);
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
                    return GestureDetector(
                      onTap: () {
                        print(rooms[index_].id);
                      },
                      child: ListTile(
                        title: Text(rooms[index_].id),
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
    );
  }
}
