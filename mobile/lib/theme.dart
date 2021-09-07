import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:perflow/helpers/create_material_color.dart';

class Perflow {
  Perflow._();

  static const title = 'Perflow';

  static const primaryColor = Color(0xFFFD5D34);
  static const primaryLightColor = Color(0xFFFD9122);
  static const errorColor = Color(0xFFFF0008);

  static const surfaceColor = Color(0xFF282F37);
  static const backgroundColor = Color(0xFF21292D);

  static const textColor = Color(0xFFFAFBFF);
  static const textGrayColor = Color(0xFF9597A1);
  static const textDarkColor = Color(0xFF717477);
  static const textAccentColor = Color(0xFFFF792A);

  static const primaryGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [ primaryLightColor, primaryColor ]
  );

  static const secondaryGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [ Color(0xFF864099), Color(0xFF464192) ]
  );

  static final inputDecoration = InputDecoration(
    contentPadding: const EdgeInsets.symmetric(
      horizontal: 26,
      vertical: 12
    ),
    filled: true,
    fillColor: surfaceColor,
    border: const OutlineInputBorder(),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(32),
      borderSide: const BorderSide(color: textDarkColor, width: 2),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(32),
      borderSide: const BorderSide(
        style: BorderStyle.solid,
        color: primaryLightColor
      )
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(32),
      borderSide: const BorderSide(
          style: BorderStyle.solid,
          color: errorColor
      )
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(32),
        borderSide: const BorderSide(
          style: BorderStyle.solid,
          color: errorColor
        )
    ),
  );

  static final ThemeData theme = ThemeData(
    textTheme: textTheme.apply(
      bodyColor: textColor,
      displayColor: textGrayColor,
      decorationColor: textGrayColor
    ),

    brightness: Brightness.dark,
    primaryColor: primaryColor,
    accentColor: primaryLightColor,
    errorColor: errorColor,
    backgroundColor: backgroundColor,
    canvasColor: backgroundColor,
    cardColor: surfaceColor,
    primarySwatch: createMaterialColor(primaryLightColor),
  );

  // Generated at https://material.io/design/typography/the-type-system.html#type-scale
  static final textTheme = TextTheme(
    headline1: GoogleFonts.rubik(
      fontSize: 98,
      fontWeight: FontWeight.w800,
      letterSpacing: -1.5,
    ),
    headline2: GoogleFonts.rubik(
      fontSize: 61,
      fontWeight: FontWeight.w800,
      letterSpacing: -0.5,
    ),
    headline3: GoogleFonts.rubik(
      fontSize: 49,
      fontWeight: FontWeight.w700,
    ),
    headline4: GoogleFonts.rubik(
      fontSize: 35,
      fontWeight: FontWeight.w700,
      letterSpacing: 0.25,
    ),
    headline5: GoogleFonts.rubik(
      fontSize: 24,
      fontWeight: FontWeight.w500,
    ),
    headline6: GoogleFonts.rubik(
      fontSize: 20,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.15,
    ),
    subtitle1: GoogleFonts.rubik(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.15,
    ),
    subtitle2: GoogleFonts.rubik(
      fontSize: 14,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.1,
    ),
    bodyText1: GoogleFonts.rubik(
      fontSize: 16,
      fontWeight: FontWeight.w300,
      letterSpacing: 0.5,
    ),
    bodyText2: GoogleFonts.rubik(
      fontSize: 14,
      fontWeight: FontWeight.w300,
      letterSpacing: 0.25,
    ),
    button: GoogleFonts.rubik(
      fontSize: 16,
      fontWeight: FontWeight.w500,
      letterSpacing: 1.25,
    ),
    caption: GoogleFonts.rubik(
      fontSize: 12,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.4
    ),
    overline: GoogleFonts.rubik(
      fontSize: 10,
      fontWeight: FontWeight.w400,
      letterSpacing: 1.5,
    ),
  );
}
