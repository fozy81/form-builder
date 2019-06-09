---
layout: default
title: "What is WayOway?"
---

## API description

Data is stored in documents compromising of a single **Item**. Firstly, each **Item** stores all the meta-data associated with the project it is associated with. Nested beneath the **Item** and **Form**(s). The Form contains all the meta-data required for the form. Beneath each form at the **Question**(s). Questions contain all the information about the question as well as a 'response' field which is the raw response input by the user.

**key**|**type**|**description**
:-----:|:-----:|:-----:
project\_id|uuid|ID of unique project.
project\_shortlink|shortlink|Shortlink based on flickr base58
project\_name|string|Name of project
project\_desc|string|Description of project
start\_date|date|Due date of the project.
end\_date|date|Deadline of the project
project\_prefs|object|Preferences of the item.
project\_repeat\_id|uuid|Shared ID if project repeated.
project\_created|date|Date project created.
 | |
 | |
item\_id|uuid|ID of unique item
item\_name|string|Name of item.
item\_shortlink|shortlink|Shortlink based on flickr base58
item\_desc|string|Description of item.
lat|float|Latitude of item.
lon|float|Longitude of item.
item\_name\_id|uuid|Item ID shared between projects
item\_pos|integer|Order for displaying items in project
item\_prefs|object|Short for "preferences", these are the settings for the item
item\_created|date|Date item created.
 | |
form\_id|uuid|ID of unique form
form\_shortlink|shortlink|Shortlink based on flickr base58.
 | |
form\_name\_id|uuid|ID of form name
form\_desc|string|Description of form.
name|string|Name of form
form\_rep\_id|uuid|Shared ID if form replicated
container\_shortlink|shortlink|Shortlink to container based on flickr base58.
container\_id|uuid|ID of container
container\_desc|string|Description of container
container\_int\_id|uuid|ID of container instance
container\_name|string|Name of container
container\_location|string|Current location of conatiner
destination\_location|string|Desintation of container
date\_received|date|Date container received at destination
substance|string|Type of substance is the form questioning
 | |
form\_perfs|object|Short for "preferences", these are the settings for the form
form\_pos|integer|Order for displaying forms
monitoring\_purpose|array|reason for recording response
form\_type|string|type of form collect – routine, adhoc etc
form\_version|integer|Version of form – incremented each time form is updated
 | |
response\_id|uuid|Unique id of the response.
form\_shortlink|shortlink|Shortlink based on flickr base58.
question\_desc|string|Description of question.
question|string|Name of question.
pos|integer|Position of the question in the form.
batch\_id|uuid|If in batch – give UUID.
 | |
required|boolean|Is a response required (or optional)?
max|float|Max input value for response.
min|float|Min input value for response.
response\_qualifier|string|Less than or more than symbol if response matches clamp high or low values.
clamp\_high|float|If response value higher, round down to this value.
clamp\_low|float|If response value lower, round up to this value.
decimal\_places|integer|Number of decimal places allowed in response value.
round|boolean|Should response be rounded.
response\_type|string|Type of reponse input e.g. date, number, text…
displayed|boolean|Should question by displayed (some calculated responses may not be require to be displayed to users).
response\_created|date|Date when response was created
placeholder|string|Placeholder for response.
placeholder\_update|boolean|If placeholder can be updated by user.
multi\_response|boolean|Allow multiple responses for this question.
multi\_unique|boolean|If multiple response allowed, each response must have unique value.
