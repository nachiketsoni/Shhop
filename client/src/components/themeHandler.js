

export const themeHandler=(themeFlag)=>{
    const root=document.documentElement;
    root?.style.setProperty(
      "--background",
      themeFlag===true ? "#fff" : "#222222"
    );
    root?.style.setProperty(
      "--card",
      themeFlag===true ? "#fff" : "#242526"
    );
    root?.style.setProperty(
      "--hover",
      themeFlag===true ? "#EAECE6" : "#565656"
    );
    root?.style.setProperty(
      "--secText",
      themeFlag===true ? "#565656" : "#D8D8D8"
    );
    root?.style.setProperty(
      "--primText",
      themeFlag===true ? "#222222" : "#fff"
    );
    root?.style.setProperty(
      "--logo",
      themeFlag===true ? "#669C96" : "#fff"
    );
    root?.style.setProperty(
      "--lightHover",
      themeFlag===true ? "#f0f3f0":"#212121"
    );
    root?.style.setProperty(
      "--shade",
      themeFlag===true ?"rgba(255, 255, 255, 0.37)":"rgba(0, 0, 0, 0.301)"
    );

}