import { Bodies, Composite, IBodyDefinition, Body } from "matter-js";
import Globals from "./Globals";

export default class PhysicsBody
{
    public static circle(x: number, y: number, radius: number, options: IBodyDefinition): Body
    {
        let body = Bodies.circle(x, y, radius, options);
        Composite.add(Globals.getWorld(), body);

        return body;
    }
}