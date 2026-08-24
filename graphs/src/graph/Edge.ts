import Vertex from './Vertex';
class Edge {
    private source: Vertex;
    private destination: Vertex;
    private weight: number;
    constructor(source: Vertex, destination: Vertex, weight: number = 0) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
    public getSource(): Vertex {
        return this.source;
    }
    public getDestination(): Vertex {
        return this.destination;
    }
    public getWeight(): number {
        return this.weight;
    }
}
export default Edge;