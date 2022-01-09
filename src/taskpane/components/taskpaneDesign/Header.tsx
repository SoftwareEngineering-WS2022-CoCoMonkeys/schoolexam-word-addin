import * as React from "react";
import "./Header.scss";
import { ActionButton, CommandBarButton, IIconProps } from "@fluentui/react";
import BackButton from "../util/BackButton";

export interface HeaderProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setDisplayLogin: (displayLogin: boolean) => void;
  displayLogin: boolean;
}

export default function Header(props: HeaderProps) {
  const userIcon: IIconProps = { iconName: "Contact" };
  const userIconChecked: IIconProps = {
    iconName: "ReminderPerson",
    style: {
      color: "green",
    },
  };

  const loginButton = props.loggedIn ? (
    <ActionButton id="login-btn-checked" className="margin-btn" iconProps={userIconChecked} />
  ) : (
    <ActionButton
      id="login-btn"
      className="margin-btn"
      iconProps={userIcon}
      text="Login"
      onClick={() => props.setDisplayLogin(true)}
    />
  );

  function testFunc() {
    /* Word.run(async (context) => {
       const range = context.document.getSelection();
       await context.sync();

       const insertedTextRange = range.insertText(`Test Bookmark`, Word.InsertLocation.replace);

       const uniqueStr = new Date().getTime();
       const bookmarkName = `Test_BookmarkCode_${uniqueStr}`;
       insertedTextRange.insertBookmark(bookmarkName);

       await context.sync();
     });
     */
    Word.run(async (context) => {
      context.document.body.paragraphs
        .getFirst()
        .getRange()
        .insertHtml(
          '<a style="text-decoration: none" href="www.google.com">selectedWord</a>',
          Word.InsertLocation.replace
        );
      await context.sync();
    });
  }

  return (
    <div id="header">
      {props.displayLogin ? <BackButton onBack={() => props.setDisplayLogin(false)} /> : loginButton}
      <ActionButton onClick={testFunc}>asdfsfsfa</ActionButton>
    </div>
  );
}
