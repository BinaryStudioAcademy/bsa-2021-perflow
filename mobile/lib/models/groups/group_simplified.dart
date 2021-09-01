import 'package:json_annotation/json_annotation.dart';

part 'group_simplified.g.dart';

@JsonSerializable()
class GroupSimplified{
  final int id;
  final String name;

  const GroupSimplified({
    required this.id,
    required this.name
  });

  factory GroupSimplified.fromJson(Map<String, dynamic> json) => _$GroupSimplifiedFromJson(json);
  Map<String, dynamic> toJson() => _$GroupSimplifiedToJson(this);
}