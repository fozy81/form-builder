---
layout: default
title: "What is WayOway?"
---

# Welcome

  WayOway is a simple way to plan data gathering for your research project.
  Create a project, add the items you need and the forms you need to
  complete. Then monitor and update your project as it progresses.

  We intentionally kept its functionality, design and code to a minimum,
  so we can focus on building robust foundations for your project. This
  allows you to build custom features on top.

  WayOway gives you a flexible structure to build your research project
  upon and can handle  many different types of data. For example, you can
  collect respones, samples, questionaires, surveys, specimens, locations,
  images etc in both remote (offline) locations or in the lab.

  For physical samples, you can print labels and keep track of your samples
  as they pass through your analysis processes.

  <img src="/assets/low-profile-dog.png" alt="Illustration of Hoodie’s 'Low-Profile Dog' waving" class="low-profile-dog">
 WayOway uses the Hoodie javascript framework and implements all its features for you:

<ul>
  <li>Add, update, remove and find data</li>
  <li>Create an account, Login, Sign out, destroy account</li>
  <li>Reset password</li>
  <li>Change Username and Password</li>
</ul>

  Find out more about Hoodie:
  <a href="hood.ie/intro/"></a>

  Your data is held in a couchdb based database. Allowing access directly via a web api or via a python or R libraries.


WayOway is an open-source project hosted here:
    <a href="https://github.com/fozy81/form-builder">  
  but you can contribute much more than just code</a>.


# Developer Guide

## Intro

  WayOway uses Couchdb, a nosql, document database as a backend. Couchdb allows multi-master sync, scales from Big Data to Mobile,
  with an Intuitive HTTP/JSON API and designed for Reliability.

## Database Structure

  To the users of WayOway, it appears data is stored in Projects containing Item(s), Form(s), Question(s) and Response(s). In reality, each Project is split into separate documents containing information about each Item. If a project contains multiple items, these can be joined and grouped together if Item documents share the same Project ID.

  In summary, **Item** documents are the place where responses to questions are stored and are the main document type. There are other supporting document types or 'tables'. For instance, for saving form templates, user details or units of measurement.  

## Document Structure

  Each Item document contains project data, beneath are nested the **Form**(s). The Form contains all the meta-data required for the form. Beneath each form are the **Question**(s). Questions contain all the information about the question as well as a **Response** field which is the raw response input by the user.

## Document Design trade-off

  The documents are nested in this structure (or in database lingo - 'de-normalized'), as this is how the data is used and retrieved in practice. Building the database around documents containing items, feels like a 'natural break', for instance this avoids unnecessary conflicts as multiple users are unlikely to update the same item at the same time. This structure also limits the potential size of the database by not having a separate document for each Response or Form.
