<?php

use Laravel\Mcp\Facades\Mcp;
use App\Mcp\Servers\TodoServer;

Mcp::local('/mcp', \App\Mcp\Servers\TodoServer::class);
