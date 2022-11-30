# Login

Used to collect a data about all visualizations.

**URL** : `/api/visualization?id=`

**URL parameters**: `id=[1..10]` - an id of required visualization

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "[visualization id]",
    "name": "[visualization name]",
    "description": "[visualization description]",
    "source": "[url to data source]",
    "data": [{<data entry>}]
}
```

## Error Response

**Condition** : If visualization does not exist.

**Code** : `503 SERVER ERROR`

**Content** :

```json
{
    "message": "I am not working"
}
```
