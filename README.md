# Excel Workbook Clone

## Overview

This project is a comprehensive implementation of an Excel-like workbook application built using plain JavaScript. It combines sophisticated logic and a variety of features to offer a functional and interactive spreadsheet experience. Key functionalities include formula evaluation, cycle validation, multi-sheet handling, and file operations.

## Features

### 1. Static UI Structuring
- **Description**: The application features a static UI structure that mimics the look and feel of traditional spreadsheet software. It includes a grid layout for cells, formula bars, and property panels.
- **Logic**: The static structure ensures a consistent user interface, which simplifies the interaction and manipulation of spreadsheet data.

### 2. Two-Way Binding: DB Storage and UI of Cell Properties
- **Description**: This feature synchronizes the database storage with the cell UI properties, ensuring that any changes in one are reflected in the other in real-time.
- **Logic**: Two-way data binding maintains consistency between the visual representation of data and its underlying storage, allowing for seamless updates and interactions.

### 3. Formula Evaluation
- **Description**: The application supports complex formula evaluation within cells. Users can input and compute formulas directly within the spreadsheet.
- **Logic**: Formulas are parsed, evaluated, and computed, leveraging JavaScript’s `eval` function after resolving cell references and operators.

### 4. Formula Cycle Validation - Graph Algorithm (DFS)
- **Description**: To prevent circular dependencies in formulas, the application employs Depth-First Search (DFS) within a directed graph to detect cycles.
- **Logic**: A graph representation of cell dependencies is used to identify and manage cyclic references, ensuring formula correctness and stability.

### 5. Color Tracking of Cycle Validation (Directed Graph)
- **Description**: Visual indicators are used to highlight cells involved in cyclic dependencies. This feature helps users quickly identify and resolve issues.
- **Logic**: Nodes in the dependency graph are color-coded based on their involvement in cycles, providing a clear visual cue of problematic areas.

### 6. Multiple Sheet Handling - Storage Management
- **Description**: Users can create, manage, and switch between multiple sheets. The application handles storage and retrieval of data for each sheet independently.
- **Logic**: Each sheet’s data is stored in separate arrays, allowing for dynamic management and retrieval of sheet-specific information.

### 7. Cut, Copy, Paste Between Cell Ranges
- **Description**: The application supports cut, copy, and paste operations across cell ranges. Users can select multiple cells, copy or cut their content, and paste it into different areas.
- **Logic**: The selected cell ranges are stored and manipulated, enabling efficient and accurate data transfer between cells.

### 8. Open and Save Excel Feature
- **Description**: Users can open and save spreadsheets in Excel format. The application converts data to and from JSON for compatibility with Excel file structures.
- **Logic**: File operations are handled using JavaScript’s `FileReader` and `Blob` APIs for reading and writing Excel-compatible data.

## Installation and Usage

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
