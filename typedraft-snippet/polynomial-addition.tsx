/*
ref: https://raw.githubusercontent.com/mistlog/algorithm/master/src/linear-list/polynomial-addition.tsx
*/

/*
# Polynomial Addition
*/

/*
## Item
*/
export class Item
{
    m_Coefficient: number;
    m_Exponential: number;
}

/*
The item is in the form of $ ax^{e_1}y^{e_2}z^{e_3} $, and $ -6xy^{5} = -6x^{1}y^{5}z^{0} $ will be represented as: 
```typescript
{
    m_Coefficient:-6,
    m_Exponential:150
}
```
*/

/*
## Polynomial
*/

/*
Polynomial is a collection of items:
*/

export class Polynomial
{
    m_Items: Array<Item>;
}

/*
As for polynomial, $x^6-6xy^5+5y^6$  would be represented as:
```typescript
[
    {
        m_Coefficient:1,
        m_Exponential:600
    },
    {
        m_Coefficient:-6,
        m_Exponential:150
    },
    {
        m_Coefficient:5,
        m_Exponential:60
    }
]
```

The convention is that items of polynomial are stored so that exponential is in decreasing order.
*/

/*
## Addtion Algorithm
*/

/*
In this algo, we add **this** polynomial to **another**, and **another** polynomial will be modified.

For example, let $p=x+y+z$ and $q=x^2-2y-z$, after adding $p$ to $q$, $q$ would be $x^2+x-y$.
*/
<Polynomial /> + function Add(this: Polynomial, another: Polynomial)
{
    const P = this.m_Items;
    const Q = [...another.m_Items];

    let p = 0;
    let q = 0;

    for (; ;)
    {
        if (P[p].m_Exponential < Q[q].m_Exponential)
        {
            //@ts-ignore
            <MoveToNextItemOfQ />;
        }
        else if (P[p].m_Exponential === Q[q].m_Exponential)
        {
            //@ts-ignore
            <CheckIfFinishedAndReturn />;
            //@ts-ignore
            <AddCoefficients />;
        }
        else if (P[p].m_Exponential > Q[q].m_Exponential)
        {
            //@ts-ignore
            <InsertNewItem />;
        }
    }
};

/*
### Overview

The essence of this algo is that we will maintain two pointers $p$ and $q$, and during each iteration we will find opportunity to add item of $P$ to $Q$.
*/

/*
### Exponential: item at p < item at q

For example, when adding $x+y+z$ to $x^2-2y-z$, we set $p$ and $q$ to 0, which means we want to add $x$ to $x^2$. 

However, we find that it's impossible because exponential of $x$ is less than $x^2$, which means this item can't be added to this position in $q$. 

> Don't forget about the convention that exponential is in decreasing order.

In this situation, we keep $p$ and advance $q$ to next position to inspect next item of $Q$, that's because items are stored in decreasing order and exp at $p$ is less than that at $q$, and there may be oppotunity to add it to next item with smaller exp of $Q$.
*/

/*
### Items with same exponential

It's intuitive to handle this case:

*/


function AddCoefficients(P: Array<Item>, Q: Array<Item>, p: number, q: number)
{
    Q[q].m_Coefficient += P[p].m_Coefficient;
    //@ts-ignore
    <CheckIfDeleteZeroItem />;
}

/*
If we add $y$ to $-2y$, we can just sum up the coefficient, however, the sum can be zero. For example if we add $z$ to $-z$, we get $0z$, it's not necessary to store it in polynomial.
*/

function CheckIfDeleteZeroItem(Q: Array<Item>, p: number, q: number)
{
    if (Q[q].m_Coefficient === 0)
    {
        //@ts-ignore
        <RemoveItemAtQ />;
    }
    else
    {
        //@ts-ignore
        <MoveToNextItemOfQ />;
    }
    //@ts-ignore
    <MoveToNextItemOfP />;
}

/*
Removing item at $q$ results in $q$ pointing to next item of $Q$ so that we should do nothing about $q$.
*/

/*
In addtion to adding coefficients, there is another case that we reach both end of polynomial:
*/

function CheckIfFinishedAndReturn(P: Array<Item>, Q: Array<Item>, p: number)
{
    /**
     * the last item of any polynomial is always
     * {
          m_Coefficient:0,
          m_Exponential:-1
     * }
     */
    if (P[p].m_Exponential < 0)
    {
        Q.pop();
        return Reflect.construct(Polynomial, [Q]);
    }
}

/*
### Insert item

Let's return to adding $x$ to $x^2$, we move to $-2y$ and find that exp of $x$ is greater than that of $y$, which means you can't find a place to add $x$, because if you move to next item of $Q$, you still get item with exp less than $x$.

Instead, we will insert $x$ as an item to $Q$:
*/

function InsertNewItem(P: Array<Item>, Q: Array<Item>, p: number, q: number)
{
    const new_item = Reflect.construct(Item, [P[p].m_Coefficient, P[p].m_Exponential]);
    //@ts-ignore
    <InsertItemAtQ />;
    //@ts-ignore
    <MoveToNextItemOfP />;
    //@ts-ignore
    <MoveToNextItemOfQ />;
}

/*
## Appendix 
*/

/*
### Trival Initialization
*/
<Item /> + function constructor(this: Item, coefficient: number, exponential: number)
{
    this.m_Coefficient = coefficient;
    this.m_Exponential = exponential;
};

<Polynomial /> + function constructor(this: Polynomial, items: Array<Item>)
{
    /**
     * trick: add a sentinel node at the end of every polynomial for consistence
     */
    this.m_Items = [...items, Reflect.construct(Item, [0, -1])];
};

/*
### Trival Implementation
*/

function MoveToNextItemOfQ(q: number)
{
    q += 1;
}

function MoveToNextItemOfP(p: number)
{
    p += 1;
}

function RemoveItemAtQ(Q: Array<Item>, q: number)
{
    Q.splice(q, 1);
}

function InsertItemAtQ(Q: Array<Item>, q: number, new_item: Item)
{
    Q.splice(q, 0, new_item);
}

/*
# Reference

This algo is adapted from TAOCP I 2.2.4.

*/