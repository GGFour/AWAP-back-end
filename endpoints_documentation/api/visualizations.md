# Login

Used to collect a data about all visualizations.

**URL** : `/api/visualizations`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {. . .},
    {
        "id": "[visualization id]",
        "name": "[visualization name]",
        "description": "[visualization description]",
        "source": "[url to data source]",
        "data": [{<data entry>}]
    },
    {. . .}
]
```

## Error Response

**Condition** : If something wrong with server.

**Code** : `503 SERVER ERROR`

**Content** :

```json
{
    "message": "I am not working"
}
```
