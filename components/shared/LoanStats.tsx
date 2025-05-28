"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee, FileText, Clock, CheckCircle, } from "lucide-react"
import {formatCurrency} from '@/utils/loan_stat_functions'
import { LoanApplicationType, LoanstatsType } from '@/utils/LoanRequest.schema'

const LoanStats = ({loanApplications , stats} : {loanApplications : LoanApplicationType[] , stats : LoanstatsType}) => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-xs text-muted-foreground">
                        Across {new Set(loanApplications.map((a) => a.lenderName)).size} lenders
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pending}</div>
                    <p className="text-xs text-muted-foreground">Awaiting lender response</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Approved Loans</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.approved}</div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(stats.approvedAmount)} approved</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requested</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
                    <p className="text-xs text-muted-foreground">Across all applications</p>
                </CardContent>
            </Card>
        </>
    )
}

export default LoanStats