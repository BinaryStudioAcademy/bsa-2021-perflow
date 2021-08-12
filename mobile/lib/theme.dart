import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Perflow {
  Perflow._();

  void t() {

  }

  static const title = 'Perflow';

  static const primaryColor = Color(0xFFFD5D34);
  static const primaryLightColor = Color(0xFFFD9122);

  static const surfaceColor = Color(0xFF282F37);
  static const backgroundColor = Color(0xFF21292D);

  static const textColor = Color(0xFFFAFBFF);
  static const textGrayColor = Color(0xFFA3A6B1);
  static const textDarkColor = Color(0xFF717477);
  static const textAccentColor = Color(0xFFFF792A);

  static const primaryGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [ primaryColor, primaryLightColor ]
  );

  static final ThemeData theme = ThemeData(
    textTheme: textTheme,

    brightness: Brightness.dark,
    primaryColor: primaryColor,

    backgroundColor: backgroundColor,
    canvasColor: backgroundColor,
    cardColor: surfaceColor,

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        primary: primaryLightColor,
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        primary: primaryLightColor
      ),
    ),

    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        primary: primaryLightColor
      )
    )
  );

  // Generated at https://material.io/design/typography/the-type-system.html#type-scale
  static final textTheme = TextTheme(
    headline1: GoogleFonts.rubik(
      fontSize: 98,
      fontWeight: FontWeight.w300,
      letterSpacing: -1.5,
      color: textColor
    ),
    headline2: GoogleFonts.rubik(
      fontSize: 61,
      fontWeight: FontWeight.w300,
      letterSpacing: -0.5,
      color: textColor
    ),
    headline3: GoogleFonts.rubik(
      fontSize: 49,
      fontWeight: FontWeight.w400,
      color: textColor
    ),
    headline4: GoogleFonts.rubik(
      fontSize: 35,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.25,
      color: textColor
    ),
    headline5: GoogleFonts.rubik(
      fontSize: 24,
      fontWeight: FontWeight.w400,
      color: textColor
    ),
    headline6: GoogleFonts.rubik(
      fontSize: 20,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.15,
      color: textColor
    ),
    subtitle1: GoogleFonts.rubik(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.15,
      color: textColor
    ),
    subtitle2: GoogleFonts.rubik(
      fontSize: 14,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.1,
      color: textColor
    ),
    bodyText1: GoogleFonts.rubik(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.5,
      color: textColor
    ),
    bodyText2: GoogleFonts.rubik(
      fontSize: 14,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.25,
      color: textColor
    ),
    button: GoogleFonts.rubik(
      fontSize: 14,
      fontWeight: FontWeight.w500,
      letterSpacing: 1.25,
      color: textColor
    ),
    caption: GoogleFonts.rubik(
      fontSize: 12,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.4,
      color: textColor
    ),
    overline: GoogleFonts.rubik(
      fontSize: 10,
      fontWeight: FontWeight.w400,
      letterSpacing: 1.5,
      color: textColor
    ),
  );
}
