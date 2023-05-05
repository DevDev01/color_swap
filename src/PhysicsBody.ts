import { Bodies, Composite, IBodyDefinition, Body } from "matter-js";
import { Globals } from "./Globals";
import { Vector } from "p5";

export default class PhysicsBody
{
    public static circle(position: Vector, radius: number, options?: IBodyDefinition): Body
    {
        let body = Bodies.circle(position.x, position.y, radius, options);
        Composite.add(Globals.getWorld(), body);

        return body;
    }

    public static rect(position: Vector, width: number, height: number, options?: IBodyDefinition): Body
    {
        let body = Bodies.rectangle(position.x, position.y, width, height, options);
        Composite.add(Globals.getWorld(), body);

        return body;
    }

    public static remove(body: Body)
    {
        Composite.remove(Globals.getWorld(), body);
    }
}