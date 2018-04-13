<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListItemResource;
use App\ListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class ListItemController
 * @package App\Http\Controllers
 */
class ListItemController extends Controller
{
    /**
     * Returns a collection of list items created by the authenticated
     * user.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ListItemResource::collection(
            Auth::user()->listItems
        );
    }

    /**
     * Stores the new list item in the database for the authenticated
     * user.
     *
     * @param Request $request
     *
     * @return ListItemResource
     */
    public function store(Request $request)
    {
        // Validate the supplied data by the client.
        $request->validate([
            'data'   => 'required|string',
            'status' => 'required|string'
        ]);

        // Next, we'll create and attach the list item to the
        // authenticated user.
        $item = Auth::user()->listItems()->create([
            'data'   => $request->input('data'),
            'status' => $request->input('status')
        ]);

        return new ListItemResource($item);
    }

    /**
     * Updates the list item with new supplied data.
     *
     * @param Request $request
     * @param int $item_id
     *
     * @return ListItemResource
     */
    public function update(Request $request, $item_id)
    {
        // Validate the supplied data by the client.
        $props = $request->validate([
            'data'   => 'string',
            'status' => 'string'
        ]);

        // Now, we'll determine whether the authenticated user is the
        // owner of the list item. Since, we don't want any other person
        // to edit the list item than the owner itself.
        $item = ListItem::where('user_id', Auth::id())->findOrFail($item_id);

        // Next, we'll update the properties or keys supplied by the
        // client on the item and then store it in the database back.
        foreach ($props as $key => $value) {
            $item->{$key} = $value;
        }

        $item->save();
        return new ListItemResource($item);
    }

    /**
     * Deletes the list item with the supplied id for the authenticated
     * user.
     *
     * @param $item_id
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function destroy($item_id)
    {
        // First, we'll determine whether the person trying to delete the
        // list item is the owner of it. Since, we don't want any other
        // person to be able to delete it than the owner itself.
        $item = ListItem::where('user_id', Auth::id())->findOrFail($item_id);

        // Finally, we'll delete and return a no-content found status code
        // with the response so the client can know whether or not the
        // item was successfully deleted.
        $item->delete();

        return response('', 204);
    }
}
