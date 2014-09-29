The front-end SproutCore application for the Curators Workbench.

## Installing

It's recommended to install the front and back-end CWB applications in sibling directories. For example:

		git clone git@github.com:berkmancenter/cwb_frontend.git /system/code/cwb-sc
		git clone git@github.com:berkmancenter/cwb_backend.git /system/code/cwb-rails

After cloning the project, run `bundle install`.

Now install the build tools with `npm install`.

## Building

In order to run the CWB application, you need to build the front-end Sproutcore app into the back-end Rails app and then run the Rails app.

Build the front-end app:

		sproutcore build cwb --buildroot ../cwb-rails/public

From the rails app directory:

		bundle exec rails s

You'll find it running at [http://localhost:3000](http://localhost:3000).

## Making code changes:

Sproutcore caches heavily so you'll often need to empty the tmp and static files after making front-end code changes:

		rm -rf ./tmp
		rm -rf ../cwb-rails/public/static

Re-build the app:

		sproutcore build cwb --buildroot ../cwb-rails/public

We wrote a script that consolidates these 3 commands into a single command:

		./cwb build-rails -f

## Using CWB

#### Managing Projects

After logging in, you'll see the projects screen. Here users can add and remove projects using the buttons in the top left corner of the screen.

Directly below the project managment buttons is the list of projects that have been created. Selecting a project will populate the right side of the screen with the project's metadata and vocabularies.

Select a vocabulary to view a list of the terms it contains, and use the buttons at the bottom of the screen to create, edit, or delete terms. Note that modifying these terms will only affect the selected project.

#### Tagging Files

After selecting a project, click the "Files" button in the top right corner to go to the files page. Here users can view the list of folders and files that belong to a project, and can "tag" each file with terms from the project's vocabularies.

Three actions can be performed on any file or group of files:

**Add Tags**

You can open the tagging pane for a single file by double clicking the file or by clicking the file's tag icon. Once the pane is open, you'll see a list of the project's vocabularies and terms. The highlighted terms are terms that the file has already been tagged with. Make sure the appropriate terms are selected by clicking on them and then click "Save". Any terms you de-selected will be removed from the file.

You can add tags to multiple files at once by toggling the checkbox on for a set of files and then clicking the "Add Tags" button. In this case, the highlighted terms are terms that every selected file (in the current folder) has already been tagged with. When you click save, each file will be tagged with the new set of terms you selected and any pre-existing tags will be removed.

**Mark Important**

You can "star" a specific file as important by clicking its star icon. Or you can star multiple files at once by toggling their checkboxes on and then clicking the "Mark as Important" button. To view a list of all starred files simply click the "Important Files" folder in the top left corner.

**Add to Work Queue**

You can add files to the work queue by toggling their checkboxes on and then clicking the "Add to Work Queue" button. To view the work queue simply click the "Work Queue" folder in the top left corner.

Note: the work queue is tied to your current tagging session only (unlike tags and stars). If you leave and come back the work queue will be empty.

#### Managing Accounts (admin only)

The "Manage Accounts" button in the top left of the projects page is only visible to admins. Clicking it will take you to the accounts page, where you can create new accounts and view/edit/remove existing accounts.