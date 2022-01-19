<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/SoftwareEngineering-WS2022-CoCoMonkeys/schoolexam">
    <img src="assets/schoolexam-logo.png" alt="Logo" width="80" height="80">
  </a>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

An Add-In for Microsoft Word as part of the Schoolexam system. The Add-In is purposed to:

- Associate document regions with tasks.
- Reserve space for the QR-Codes added during the build step.
- Convert the document to a standard interchange format (PDF).
- Export the converted document to the backend.
- Trigger the build of exams that have a template document.
- Upload submissions for exams that have taken place.

### Built With

* [Yeoman Generator](https://github.com/OfficeDev/generator-office)
* [React.js](https://reactjs.org/) and [react-sweet-state](https://github.com/atlassian/react-sweet-state)
* [Typescript](https://www.typescriptlang.org/)
* [Word JavaScript API](https://docs.microsoft.com/de-de/office/dev/add-ins/reference/overview/word-add-ins-reference-overview)
* [Jest](https://jestjs.io/)

## Getting Started

Currently, it is only possible to run the Add-In after cloning this repository. Additionally, it has only been verified
to run on Windows 10.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (we used v17.0.1) with [npm](https://www.npmjs.com/)
- [Microsoft Word](https://www.microsoft.com/de-de/microsoft-365/word)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SoftwareEngineering-WS2022-CoCoMonkeys/schoolexam-word-addin.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run
   ```sh
   npm start
   ```
**NOTE**: You might be asked to accept a certificate from localhost. This is necessary to load the Add-In. 

## Usage

The central navigation bar gives a good overlook over what's possible.

0. **Login**
    - Enter username and password for authentication in the system
1. **Task management ("Aufgaben")** shows an overview of tasks that are currently associated with the document
    - Add a new task ("Neue Aufgabe") with a given title and maximum points
    - Enter delete ("Löschen") mode and delete tasks from the table
    - If not in deletion mode, click on the pin next to a row in the task table to jump to the task's position in the
      document
2. **Document structure management ("Struktur")** lets you manipulate important sections of the document
    - Insert the footer including the page QR-Code (This step is required to later match pages automatically)
    - Insert the title page including space for the student QR-code
    - Customize the header
3. **Export ("Exportieren")**
    - If logged in, a list of available exams is displayed.
    - Convert ("Konvertieren") the document to PDF  (*Note*: For some reason, Word only allows two exports per session.
      Otherwise, a restart is required). The document is downloaded after conversion.
    - Export ("Exportieren") the converted PDF to the backend, including task information, and associate it with the
      selected exam. A checklist of prerequisites for this action is displayed on hover.
    - Trigger the build ("Kompilieren") of a suitable exam. On success, the built PDF and a list of student QR codes for
      this exam are downloaded.
5. **Submissions ("Einreichen")**
    - Associate ubmission documents ("Einreichung hinzufügen") with an exam.
    - Upload all cached submissions.

## Roadmap

- implement utility functions that are frequently used during exam creation, e.g. graph plotting.
- Support randomization of tasks
- Support exams (writing tasks) that have a grading scheme different from points
- Add additional pages dynamically during exams based on demand

See the [open issues](https://github.com/SoftwareEngineering-WS2022-CoCoMonkeys/schoolexam-word-addin/issues) for a full
list of proposed features (and known issues).

## Acknowledgments

- []()#wirfuerschule for the insights on the current situation in schools
- []()Capgemini for the valuable workshops with feedback for the architecture
- []()ISSE chair at the University of Augsburg for giving us room to implement our idea
- []()adesso for providing us a productive collaborative workspace

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](LICENSE.txt) for more information.

<!-- CONTACT -->



## Contact

Tom Papke - tom.papke@tum.de


<!-- ACKNOWLEDGMENTS -->

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge

[issues-url]: https://github.com/SoftwareEngineering-WS2022-CoCoMonkeys/schoolexam-word-addin/issues

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge

[license-url]: https://github.com/SoftwareEngineering-WS2022-CoCoMonkeys/schoolexam-word-addin/LICENSE.txt

[product-screenshot]: images/screenshot.png