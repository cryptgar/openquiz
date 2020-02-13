<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", 
     *  name="home", 
     *  defaults={"reactRouting": null}, 
     *  requirements={"reactRouting"="^(?!api(\/|$)).+"})
     */
    public function home() {
        return $this->render('home.html.twig');
    }
}