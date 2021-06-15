// Decouple an abstraction from its implementation allowing the two to vary independently.
// Real world example

// Consider you have a website with different pages and you are supposed to allow the user to change the theme. What would you do? Create multiple copies of each of the pages for each of the themes or would you just create separate theme and load them based on the user's preferences? Bridge pattern allows you to do the second i.e.

// In Plain Words

// Bridge pattern is about preferring composition over inheritance. Implementation details are pushed from a hierarchy to another object with a separate hierarchy.

// Wikipedia says

// The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction from its implementation so that the two can vary independently"

// WebPage -> About -> AboutLight
//                  -> AboutDark
//         -> Projects
//                  -> ProjectsLight
//                  -> ProjectsDark

//With Bridge:
//
// WebPage -> About(Theme);
//         -> Projects(Theme);
//

/*
Theme interface :

getColor()
*/

interface Theme {
  getColor(): string;
}

class DarkTheme implements Theme {
  getColor() {
    return "Dark Black";
  }
}
class LightTheme implements Theme {
  getColor() {
    return "Off white";
  }
}
class AquaTheme implements Theme {
  getColor() {
    return "Light blue";
  }
}

/*
Webpage interface :

constructor(theme)
getContent()
*/

interface Page {
  theme: Theme;
}

class About implements Page {
  theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent() {
    return "About page in " + this.theme.getColor();
  }
}

class Careers implements Page {
  theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent() {
    return "Careers page in " + this.theme.getColor();
  }
}

const darkTheme = new DarkTheme();

const about = new About(darkTheme);
const careers = new Careers(darkTheme);

console.log(about.getContent()); // "About page in Dark Black"
console.log(careers.getContent()); // "Careers page in Dark Black"
