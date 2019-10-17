export interface SideNavTile {
    title: string;
}

export interface SideNavTileDropdown {
    title: string;
    children: [SideNavTile];
}
