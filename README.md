The front-end SproutCore application for the FACADE Workbench.

## Installing

It's recommended to install the front and back-end FWB applications in sibling directories named `fwb_frontend` and `fwb_backend`. For example:

		git clone git@github.com:berkmancenter/fwb_frontend.git /system/code/fwb_frontend
		git clone git@github.com:berkmancenter/fwb_backend.git /system/code/fwb_backend

After cloning the project, move into the project folder and run `bundle install`.

Now install the build tools with `npm install`.

## Building

In order to run the FWB application, you need to build the front-end Sproutcore app into the back-end Rails app and then run the Rails app.

Build the front-end app into the rails app:

		./fwb build-rails

From the rails app directory:

		bundle exec rails s

You'll find it running at [http://localhost:3000](http://localhost:3000).

## Making code changes:

Sproutcore caches heavily so you'll often need to empty the tmp and static files after making front-end code changes:

		rm -rf ./tmp
		rm -rf ../fwb_backend/public/static

Re-build the app:

		./fwb build-rails

As a shortcut, you can pass the `-f` option to the build-rails command. The end result is the same as running the three commands above separately:

		./fwb build-rails -f

## Using FWB

#### Managing Projects

After logging in, you'll see the projects screen. Here users can add and remove projects using the buttons in the top left corner of the screen.

Directly below the project managment buttons is the list of projects that have been created. Selecting a project will populate the right side of the screen with the project's metadata and vocabularies.

Select a vocabulary to view a list of the terms it contains, and use the buttons at the bottom of the screen to create, edit, or delete terms. Please note that you cannot edit or delete the default terms and that creating a new term will make it available to the selected project only.

#### Tagging Files

After selecting a project, click the "Files" button in the top right corner to go to the files page. Here users can view the list of folders and files that belong to a project, and can "tag" each file with terms from the project's vocabularies.

Three actions can be performed on any file or group of files:

**Add Tags**

You can open the tagging pane for a single file by double clicking the file or by clicking the file's tag icon. Once the pane is open, you'll see a list of the project's vocabularies and terms. The highlighted terms are terms that the file has already been tagged with. Make sure the appropriate terms are selected by clicking on them and then click "Save". Any terms you de-selected will be removed from the file.

You can add tags to multiple files at once by toggling the checkbox on for a set of files and then clicking the "Add Tags" button. In this case, the highlighted terms are terms that every selected file (in the current folder) has already been tagged with. When you click save, each file will be tagged with the new set of terms you selected and any pre-existing tags will be removed.

There are no restrictions on the number of tags you can apply.

**Mark Important**

You can "star" a specific file as important by clicking its star icon. Or you can star multiple files at once by toggling their checkboxes on and then clicking the "Mark as Important" button. To view a list of all starred files simply click the "Important Files" folder in the top left corner.

**Add to Work Queue**

You can add files to the work queue by toggling their checkboxes on and then clicking the "Add to Work Queue" button. To view the work queue simply click the "Work Queue" folder in the top left corner.

Note: the work queue is tied to your current tagging session only (unlike tags and stars). If you leave and come back the work queue will be empty.

#### Image Previews

When you create a project, image previews will be generated for the following file types:

- .jpeg
- .jpg
- .png
- .gif
- .pdf
- .tif

#### Derivatives

From the files screen, you can upload a derivative by selecting a file and then clicking the "Add Derivative" button at the bottom of the file details pane. Once uploaded, the derivative file will be visible in the same folder as its parent. It will have a preview image (if applicable) and you'll be able to perform the same actions as with a normal file (e.g. tagging, starring).

See the "Export Data" section for info on downloading your project's derivatives.

#### Export Data

You have the following options for exporting your project's data:

- RDF/XML PIM
- Turtle PIM
- Derivatives ZIP

To do so, navigate to your project's files screen and click the "Download" button in the top right corner of the window.

#### Managing Accounts (admin only)

The "Manage Accounts" button in the top left of the projects page is only visible to admins. Clicking it will take you to the accounts page, where you can create new accounts and view/edit/remove existing accounts.