import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarItem,
    NavbarList,
} from 'keep-react'
  
const NavbarComponent = () => {
    return (
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>
            <div className='text-heading-3'>GoidaAI</div>
          </NavbarBrand>
          <NavbarList>
            <NavbarItem>Uploads</NavbarItem>
            <NavbarItem>Ficha 2</NavbarItem>
            <NavbarItem>Ficha 3</NavbarItem>
          </NavbarList>
        <NavbarList>
            <div className='text-heading-3'>GoidaAI</div>
        </NavbarList>
          <NavbarCollapseBtn />
          <NavbarCollapse>
            <NavbarItem>Projects</NavbarItem>
            <NavbarItem>Research</NavbarItem>
            <NavbarItem>Contact</NavbarItem>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
    )
  }

export default NavbarComponent;