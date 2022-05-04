type Vec2 = [number, number]

function pixelToMeter(value: number): number {
    return value / 20
}

function meterToPixel(value: number): number {
    return value * 20
}

type MapBounds = Vec2[]

enum LocationType {
    CLASSROOM,
    BATHROOM,
    OTHER
}

interface MapLocation {
    bounds: MapBounds,
    name: string,
    type: LocationType
}

function box(x: number, y: number, width: number, height: number): MapBounds {
    return [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
        [x, y],
    ]
}

const locations: MapLocation[][] = [
    [
        {
            bounds: box(70, 0, 50, 40),
            name: 'PK137',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(70, 40, 50, 40),
            name: 'PK101',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(120, 0, 40, 40),
            name: 'PK136',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(120, 40, 38, 40),
            name: 'PK102',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(158, 40, 18, 40),
            name: 'BATHROOM',
            type: LocationType.BATHROOM
        },
        {
            bounds: box(160, 0, 15, 15),
            name: 'PK134',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(160, 15, 15, 15),
            name: 'PK135',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(175, 40, 50, 40),
            name: 'PK133',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(175, 0, 50, 40),
            name: 'PK103',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(225, 0, 45, 40),
            name: 'PK132',
            type: LocationType.CLASSROOM
        },
        {
            bounds: box(225, 40, 45, 40),
            name: 'PK104',
            type: LocationType.CLASSROOM
        },
    ]
]

type Corners = [Vec2, Vec2]

function getCorners(bounds: MapBounds): Corners {
    let lx = -1
    let lz = -1
    let mx = -1
    let mz = -1
    for (let [x, z] of bounds) {
        if (x < lx || lx == -1) lx = x
        if (x > mx || mx == -1) mx = x
        if (z < lz || lz == -1) lz = z
        if (z > mz || mz == -1) mz = z
    }
    return [[lx, lz], [mx, mz]]
}

function getCenterOfBounds([[lx, lz], [mx, mz]]: Corners): Vec2 {
    return [lx + (mx - lx) / 2, lz + (mz - lz) / 2]
}

function getFontSize([[lx], [mx]]: Corners) {
    const width = mx - lx
    return width * 0.25
}

export function renderMap(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#000000'
    ctx.textAlign = 'center'
    for (let floor of locations) {
        for (let location of floor) {
            const {bounds, name, type} = location
            for (let i = 0; i < bounds.length; i++) {
                const [x, z] = bounds[i]
                if (i == 0) {
                    ctx.moveTo(x, z)
                } else {
                    ctx.lineTo(x, z)
                    ctx.moveTo(x, z)
                }
            }
            if (type != LocationType.BATHROOM) {
                const corners = getCorners(bounds)
                const [cx, cz] = getCenterOfBounds(corners)
                const fontSize = getFontSize(corners)
                ctx.font =`${fontSize}px Arial`
                ctx.fillText(name, cx, cz)
            }
        }
    }
    ctx.stroke()

}

class MapObject {

}