# jellifish

## Contribution Guide

The goal of this guide is to outline our workflow and styling recommendations.
In addition, it should help to structure our code and provide a universal format for our project.

## Contents

1. [Repository Guidelines](#repository-guidelines)
3. [Environment Setup](#environment-setup)

### Repository Guidelines

Git's entire goal is to keep a working record of all changes to our code.
However, we should strive to keep this record clean and easy to understand.

So, I present some guidelines to follow when contributing to the repository, as this will keep us organized and structured.

Finally, try to commit small changes frequently. For example, do not have "batch" commits where you introduce multiple new features or bug fixes at once. Each commit should be focused on a specific task.

#### Git Workflow
In essence, our workflow will model the [Git Branching Workflow](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows); we have separate branches for production (`master`), development (`dev`), and features/bug fixing. Merging is strategically timed such that only working and tested code is merged into `master`, and finished features are merged into `dev`.

In general, do not force push (`git push -f` or `git push --force`) to any branch. This can overwrite changes and cause tons of headaches later on.

This ensures that the `master` branch is always stable and ready for production, and should only be merged into by the project leader(s). This branch should **not** be modified directly at any time; only merges will change it. In addition, **never** force push to this branch.

The `dev` branch is only merged into when a new feature or bug is fixed. Similar to `master`, this branch should **not** be modified directly and it should **never** be forced-push into.

Features and bug fixes should exist in their own separate branches, which can be deleted when they become irrelevant (i.e merged into `dev`). For example, if you are introducing an advanced job-queueing feature, you might create a branch named `feature-job-queue`. On the other hand, if you are fixing an issue with this queueing, you might name the branch `bugfix-job-queue`.

Once a branch is merged into its parent branch, *delete the branch*. We do not
want extraneous, stale branches lying around that clutter up the repository.
To delete a branch, run `git branch -d {branch}` and then `git push origin :{branch}`.
Note the `:` - this deletes the branch off of the remote repository.

#### Branch Names
Instead of naming your branches directly off of the feature, have an appropriate
prefix to the branch name. For example, when developing the feature for React,
an appropriate branch name is `dev-react`, NOT just `react`.

Alternatively, if you are fixing a bug on the `react` implementation, you would
branch off of `dev-react` with a branch named `bugfix-react`.

#### Commit Messages
Aim to succintly describe your changes and your reasoning behind them. In addition, if you fix a bug, you should reference the associated GitHub issue and describe the bug fix. For example, you can write: `closes #34 - tasks no longer appear in randomized order` as part of the commit message. With certain keywords, you can [automatically close the referenced GitHub issue](https://help.github.com/articles/closing-issues-via-commit-messages/). In addition, you can [directly reference certain parts of the Git repository in commit messages and issues](https://help.github.com/articles/writing-on-github/#references).

Alternatively, if you introduce a bug (which I hope never happens), mention as much as you know about it, and create an appropriate GitHub issue.

A good commit message should consist of a title and a body, separated by a blank line. You can also use bullet points to list the changes. To do this, you can run `git commit`, which will open your *default Git text editor* to enter the commit message, and this allows for greater formatting and structure to the messages. To set the default text editor, run `git config core.editor {editor name}`. For example, to set it to Sublime Text (on Mac, in which the executable is `subl`): `git config core.editor subl`.

Here's an example of a good commit message, complete with title, body, and listed changes:

```
My Good Commit Message Title

I introduced some changes here. I also fixed #55, and this allows the tasks to be displayed correctly.

Unfortunately, I introduced another bug, #73, because I was unable to solve the problem of randomized time generation.

All changes:
    - Queue all tasks into a priority queue
    - Add debug statements for incorrect queueing order
    - Update task dependencies in realtime
```

### Environment Setup

An important aspect of working on a production-ready application is to maintain a standard development environment. To facilitate this, we will be using a tool called `virtualenv` in Python. Essentially, it isolates your project folder and Python installation from any other project, thus ensuring that you do not have dependency clashes. In addition, it will guarantee that we use the same Python version, which is important.

Once you have `pip` (check out the [installation guide here](http://pip.readthedocs.org/en/stable/installing/)) installed, follow this guide with the current directory set to the **project folder**:

1. Install `virtualenv` using pip: `pip install virtualenv`
3. Create the virtual environment: `virtualenv venv`
4. Activate the virtual environment: `source venv/bin/activate`

Whenever you install a new library via pip, such as by running `pip install flask`, make sure to export all of your dependencies. This is easily done by running `pip freeze > requirements.txt`. To install dependencies from a requirements file, run `pip install -r requirements.txt`.

If you ever need to deactivate your virtual environment, you can either exit the shell or run  the `deactivate` command.

*Note: the guide above assumes you are using a Unix or Unix-based environment, whether that's OS X or a Linux distribution.*
