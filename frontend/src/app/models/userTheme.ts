export interface UserTheme {
  uid: string;
  sidebarColor: ThemeColor;
  theme: Theme;
}

enum ThemeColor {
  red = "red",
  primary = "primary",
  blue = "blue",
  green = "green"
}

enum Theme {
  white = "white-content",
  black = "black-content"

}
