export default class Collision
{
    public static pointWithinCircle(px: number, py: number, cx: number, cy: number, r: number)
    {
        let distX: number = px - cx;
        let distY: number = py - cy;
        let distance: number = Math.sqrt((distX * distX) + (distY * distY));

        if (distance <= r) return true;

        return false;
    }
}