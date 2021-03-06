---
layout: page
title: "Developer Guide"
category: ref
date: 2019-06-09 17:31:40
---
# Developer Guide

## Summary

  WayOway uses Couchdb, a nosql, document database as a backend. Couchdb allows multi-master sync designed for reliability, scales from Big Data to Mobile and includes a intuitive HTTP/JSON API.

### Database Structure

  To the users of WayOway, it appears data is stored in Projects containing Item(s), Form(s). In reality, each Project is split into separate documents containing information about each Item. If a Project contains multiple items, these can be displayed together by matching the Project ID on each Item.

  In summary, **Item** documents are the place where responses to forms are stored and are the main document type. There are other supporting document types or 'tables'. For instance, for saving form templates, user details or units of measurement.

### Document Structure

  Each **Item** document contains project data, beneath are nested the **Form**(s). The Form contains all the meta-data required for the form. Beneath each form are the **Question**(s). Questions contain all the information about the question as well as a **Response** field which is the raw response input by the user.

### Document Design trade-off

  The documents are nested in this structure (or in database terms - 'de-normalized'), as this is how the data is used and retrieved in practice. Building the database around documents containing items, feels like a 'natural break', for instance this avoids unnecessary conflicts as multiple users are unlikely to update the same item at the same time. This structure also limits the potential size of the database by not having a separate document for each Response or Form.
