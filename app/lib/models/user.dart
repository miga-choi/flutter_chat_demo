import 'package:realm/realm.dart';

part 'user.g.dart';

@RealmModel()
class _User  {
  @PrimaryKey()
  late final String id;

  late String name;
}
